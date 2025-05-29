import { openConnection } from '~/server/db'
import { events } from "~/server/db/schema";
import { eq, and } from "drizzle-orm";
import path from "path";
import PdfPrinter from "pdfmake";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const month = parseInt(query.month as string, 10)
  const year = parseInt(query.year as string, 10)

  if (isNaN(month) || isNaN(year)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid month or year' });
  }

  try {
    const db = openConnection()

    const eventsData = await db.select({
      id: events.id,
      name: events.name,
      type: events.type,
      description: events.description,
      date: events.date
    }).from(events)
      .where(and(
        eq(events.month, month),
        eq(events.year, year)
      ))

    const fonts = {
      Helvetica: {
        normal: path.resolve(process.cwd(), 'public/fonts/Helvetica.ttf'),
        bold: path.resolve(process.cwd(), 'public/fonts/Helvetica-Bold.ttf'),
      },
    };

    const printer = new PdfPrinter(fonts);

    const currentDate = new Date().toLocaleString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const docDefinition: any = {
      pageOrientation: 'landscape',
      content: [
        {
          columns: [
            { text: 'Events Report', style: 'header' },
            { text: currentDate, alignment: 'right', style: 'header' }
          ],
          margin: [40, 20, 40, 20]
        },
        {
          table: {
            headerRows: 1,
            widths: ['10%', '25%', '15%', '30%', '20%'],
            body: [
              [
                { text: 'ID', style: 'tableHeader' },
                { text: 'Event Name', style: 'tableHeader' },
                { text: 'Type', style: 'tableHeader' },
                { text: 'Description', style: 'tableHeader' },
                { text: 'Date', style: 'tableHeader' }
              ],
              ...eventsData.map(event => [
                event.id.toString(),
                event.name,
                event.type,
                event.description?.length > 35 ?
                  event.description.substring(0, 35) + '...' :
                  event.description || 'N/A',
                event.date ?
                  new Date(event.date).toLocaleDateString('en-GB') :
                  'Brak daty'
              ])
            ]
          },
          layout: {
            hLineWidth: (i: number) => i === 0 ? 0 : 0.5,
            vLineWidth: () => 0,
            hLineColor: (i: number) => i === 1 ? '#c8c8c8' : 'white',
            fillColor: (rowIndex: number) => rowIndex === 0 ? '#3f51b5' : null
          },
          margin: [40, 0, 40, 0]
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          color: '#3f51b5'
        },
        tableHeader: {
          bold: true,
          fontSize: 10,
          color: 'white',
          margin: [0, 5, 0, 5]
        }
      },
      defaultStyle: {
        font: 'Helvetica',
        fontSize: 10,
        color: 'black',
        margin: [0, 2, 0, 2]
      }
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition);

    const chunks: Uint8Array[] = [];
    const buffer = await new Promise<Buffer>((resolve, reject) => {
      pdfDoc.on('data', (chunk) => chunks.push(chunk));
      pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
      pdfDoc.on('error', reject);
      pdfDoc.end();
    });

    setResponseHeaders(event, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="events-report-${month}-${year}.pdf"`
    });

    return buffer;

  } catch (error) {
    console.error('Error generating PDF:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to generate PDF report'
    });
  }
});

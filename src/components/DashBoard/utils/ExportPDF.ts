import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';

interface ExportOptions {
  filename?: string;
  title?: string;
  includeCharts?: boolean;
}

export const exportDashboardPDF = async (
  elementId: string = 'dashboard-export',
  options: ExportOptions = {}
) => {
  const {
    filename = 'Dashboard-LUXE.pdf',
    title = 'LUXE Dashboard Report',
  } = options;

  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with id '${elementId}' not found`);
    }

    // Créer un canvas du contenu
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#000000'
    });

    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    let heightLeft = canvas.height * imgWidth / canvas.width;
    let position = 0;

    // Créer PDF
    const pdf = new jsPDF('p', 'mm', 'a4');

    // Ajouter header
    pdf.setFontSize(16);
    pdf.setTextColor(245, 158, 11); // Amber
    pdf.text(title, 105, 15, { align: 'center' });

    pdf.setFontSize(10);
    pdf.setTextColor(100, 116, 139); // Slate
    const date = new Date().toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    pdf.text(`Généré le: ${date}`, 105, 22, { align: 'center' });

    // Ajouter une ligne de séparation
    pdf.setDrawColor(245, 158, 11);
    pdf.line(10, 25, 200, 25);

    // Ajouter le contenu
    position = 30;
    const pageHeight_mm = pdf.internal.pageSize.getHeight();

    while (heightLeft >= 0) {
      let heightLeft_mm = heightLeft - position;
      if (heightLeft_mm <= 0) {
        pdf.addPage();
        position = 0;
        heightLeft_mm = heightLeft;
      }

      const pageWidth = pdf.internal.pageSize.getWidth();
      const ratio = (pageWidth - 20) / imgWidth;
      const newHeight = canvas.height * imgWidth / canvas.width * ratio;

      pdf.addImage(
        imgData,
        'PNG',
        10,
        position,
        pageWidth - 20,
        newHeight
      );

      heightLeft -= pageHeight;
      position = pageHeight_mm - 30;
    }

    // Ajouter footer sur chaque page
    const pageCount = pdf.getNumberOfPages();
    pdf.setFontSize(8);
    pdf.setTextColor(100, 116, 139);

    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      pdf.text(
        `Page ${i} / ${pageCount}`,
        105,
        pdf.internal.pageSize.getHeight() - 10,
        { align: 'center' }
      );
      pdf.text(
        'LUXE © 2025 - Tous droits réservés',
        105,
        pdf.internal.pageSize.getHeight() - 5,
        { align: 'center' }
      );
    }

    // Télécharger le PDF
    pdf.save(filename);

    return { success: true, message: 'PDF exporté avec succès' };
  } catch (error) {
    console.error('Erreur lors de l\'export PDF:', error);
    throw error;
  }
};

// Fonction simplifiée pour exporter juste les stats
export const exportDashboardStats = async (stats: Record<string, any>) => {
  try {
    const pdf = new jsPDF('p', 'mm', 'a4');

    // Header
    pdf.setFontSize(16);
    pdf.setTextColor(245, 158, 11);
    pdf.text('LUXE Dashboard - Rapport Statistiques', 105, 20, { align: 'center' });

    pdf.setFontSize(10);
    pdf.setTextColor(100, 116, 139);
    pdf.text(`Généré le: ${new Date().toLocaleDateString('fr-FR')}`, 105, 28, { align: 'center' });

    pdf.setDrawColor(245, 158, 11);
    pdf.line(10, 32, 200, 32);

    // Contenu
    let yPos = 45;
    pdf.setFontSize(12);
    pdf.setTextColor(245, 245, 245);

    for (const [key, value] of Object.entries(stats)) {
      pdf.text(`${key}: ${value}`, 15, yPos);
      yPos += 10;
    }

    // Footer
    pdf.setFontSize(8);
    pdf.setTextColor(100, 116, 139);
    pdf.text(
      'LUXE © 2025 - Tous droits réservés',
      105,
      pdf.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );

    pdf.save('Dashboard-Stats.pdf');
    return { success: true, message: 'Rapport statistiques exporté' };
  } catch (error) {
    console.error('Erreur lors de l\'export:', error);
    throw error;
  }
};

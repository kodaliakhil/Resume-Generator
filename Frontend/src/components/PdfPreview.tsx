interface PdfPreviewProps {
  pdfUrl: string;
}

export default function PdfPreview({
  pdfUrl,
}: PdfPreviewProps) {
  return (
    <iframe
      src={pdfUrl}
      title="PDF Preview"
      className="h-screen w-full border"
    />
  );
}

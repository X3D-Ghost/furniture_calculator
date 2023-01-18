export const downloadPngFromSvg = (svg: string): void => {
  svgToPng(svg).then((output) => {
    const link = document.createElement('a');
    link.href = output;
    link.download = `export_${Date.now()}.png`;
    link.click();
    document.body.removeChild(link);
  });
};

const svgToPng = (svg: string) => <Promise<string>>new Promise((resolve) => {
  const url: string = getSvgUrl(svg);
  svgUrlToPng(url).then((imgData) => {
    resolve(imgData);
    URL.revokeObjectURL(url);
  });
});

const getSvgUrl = (svg: string) =>
  URL.createObjectURL(
    new Blob([svg], {
      type: 'image/svg+xml'
    })
  );

const svgUrlToPng = (svgUrl: string) =>
  <Promise<string>>new Promise((resolve) => {
    const svgImage: any = document.createElement('img');
    document.body.appendChild(svgImage);
    svgImage.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = svgImage.clientWidth;
      canvas.height = svgImage.clientHeight;
      const canvasCtx: any = canvas.getContext('2d');
      canvasCtx.drawImage(svgImage, 0, 0);
      const imgData: string = canvas.toDataURL('image/png');
      resolve(imgData);
      document.body.removeChild(svgImage);
      document.body.removeChild(canvas);
    };
    svgImage.src = svgUrl;
  });

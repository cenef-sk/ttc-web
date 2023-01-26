function loadCroppedImageFromURL(url: string, crop, wrapperWidth, wrapperHeight): Promise<any> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onerror = () => reject;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = wrapperWidth;
      canvas.height = wrapperHeight;
      // this.originalWidth = img.width
      // this.originalHeight = img.height
      if(context){
        context.drawImage(img,
          crop.left, crop.top, crop.width, crop.height,
          0, 0, wrapperWidth, wrapperHeight
        );
      }
      // this.croppedImg = canvas.toDataURL()
      resolve(canvas.toDataURL());
    };
    img.crossOrigin = 'anonymous';
    img.src = url;
  });
}

export {loadCroppedImageFromURL}

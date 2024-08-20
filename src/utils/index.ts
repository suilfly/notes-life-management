export const getTimeArea = () => {
  const date = new Date();
  const hours = date.getHours();
  return hours <= 12 ? 'Morning' : hours >= 17 ? 'Night' : 'Afternoon';
};

export const generateRandomString = (length = 10) => {
  const rand =
    'cacnkdcd23ds9cxl01savbn2g4z3vxsafafsgrevfwrqdadhfadhjyhfyfhyloh';
  let res = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.ceil(Math.random() * length);
    res += rand.charAt(randomIndex);
  }

  return res;
};

async function replaceSrc(
  img: HTMLImageElement,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  return new Promise((resolve) => {
    const image = new Image();
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = img.src;

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);
      const data = canvas.toDataURL('image/png');
      img.src = data;
      resolve(img);
    };
  });
}

export const replaceImgSrcToBase64 = (dom: HTMLElement) => {
  return new Promise((resolve, reject) => {
    const imgs = Array.from(dom.querySelectorAll('img')).filter(
      (img) => img.src
    );

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    Promise.all(imgs.map((item) => replaceSrc(item, canvas, ctx))).then(
      (response) => {
        resolve(response);
      },
      (reason) => {
        reject(reason);
      }
    );
  });
};

export const getUrlForSvg = (svg: string, isUseBlob = false) => {
  if (isUseBlob) {
    return URL.createObjectURL(
      new Blob([svg], {
        type: 'image/svg+xml',
      })
    );
  }

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

export const fileToBase64 = (fileUpload, callbackFunc, removeDataPrefix = false) => {
    const fileName = fileUpload?.name;
    const reader = new FileReader();

    reader.onloadend = () => {
        let base64Str = reader.result;
        if(removeDataPrefix) {
            base64Str = base64Str.replace("data:", "").replace(/^.+,/, "");
        }

        callbackFunc(base64Str, fileName);
    };

    if (fileName) {
        reader.readAsDataURL(fileUpload);
    }
};



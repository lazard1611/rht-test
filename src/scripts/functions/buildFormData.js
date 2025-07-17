export const buildFormData = (formData, key, data) => {
    if (key.includes('image')) {
        formData.append(key, data);
    }
    else {
        if (data === Object(data) || Array.isArray(data)) {
            for (const i in data) {
                buildFormData(formData, `${key}[${i}]`, data[i]);
            }
        }
        else {
            data && formData.append(key, data);
        }
    }
}

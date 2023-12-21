import React from 'react';

const useSelectImage = () => {
    const onSelectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        if (event.target.files?.[0]) {
            reader.readAsDataURL(event.target.files[0]);
            setFileSize(event.target.files[0].size);
        }
        reader.onload = (readerEvent) => {
            if (readerEvent.target?.result) {
                setSelectedFile(readerEvent.target.result as string);
            }
        }
        setLoading(false);
    };
    return <div>Have a good coding</div>
}
export default useSelectImage;
import { SetStateAction, useState } from 'react';
import dynamic from 'next/dynamic';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import axios from 'axios';
import { Button } from '@nextui-org/button';
import { FilePondFile, ActualFileObject, FilePondInitialFile } from 'filepond';
import { toast } from 'sonner';

const FilePond = dynamic(() => import('react-filepond').then(module => {
  const { registerPlugin } = module;
  const FilePondPluginImageExifOrientation = require('filepond-plugin-image-exif-orientation');
  const FilePondPluginImagePreview = require('filepond-plugin-image-preview');
  registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

  return module.FilePond;
}), { ssr: false });

type typeFilePond = {
  setFiles: React.Dispatch<SetStateAction<File[]>>
  files: (string | FilePondFile | Blob | ActualFileObject | FilePondInitialFile)[];
  titulo: string
  name: string
  required?: boolean
}

export default function FilePondComponent(props: typeFilePond) {

  const handleUpdateFiles = (fileItems: any[]) => {
    const validFiles = fileItems.filter(fileItem => {
      const file = fileItem.file;
      if (file.type === 'image/png') {
        return true;
      } else {
        toast.warning('Apenas arquivos PNG são permitidos');
        return false;
      }
    });

    props.setFiles(validFiles.map(fileItem => fileItem.file));
  };


  return (
    <div className="h-full flex flex-col">
      <FilePond
        files={props.files}
        allowMultiple={true}
        allowReorder={true}
        maxFiles={1}
        server={null}
        name={props.name}
        onupdatefiles={handleUpdateFiles}
        labelIdle={`Arraste ou solte o arquivo de ${props.titulo} <span class="filepond--label-action">Navegar</span>`}
      />
    </div>
  );
}
/*
  const uploadjson = async () => {
    try {
      await axios.post('http://localhost:4000/cadastromarketplace')
    } catch (error) {
      console.error(error)
    }
  }
  const upload = async () => {
    if (files.length === 0) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append('name', 'teste');
    formData.append('file', files[0]);

    try {
      const res = await axios.post(
        `https://zgs-image-production.up.railway.app/images/39ad2444-109a-4020-92cc-044926ab2b03`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkwNDlkYWMxLWUyYjEtNGJjOC05NzQ2LWRmMmZhNmUxYWYyZSIsIm5hbWUiOiJOZWN0YSIsImVtYWlsIjoiYWRtaW5AenN5c3RlbXMuY29tLmJyIiwiaWF0IjoxNzIxNjgzOTE1LCJleHAiOjE3MjE3NzAzMTUsInN1YiI6IjkwNDlkYWMxLWUyYjEtNGJjOC05NzQ2LWRmMmZhNmUxYWYyZSJ9.-92rHMvieuCqu6LwcQi-7s4hgK-WZIvHBEa4yxojRt4`
          }
        }
      );
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };*/
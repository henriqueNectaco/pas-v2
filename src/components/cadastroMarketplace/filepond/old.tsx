import { useState } from 'react';
import dynamic from 'next/dynamic';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import axios from 'axios';
import { toast } from 'sonner';
import { ActualFileObject, FilePondFile } from 'filepond';

const FilePond = dynamic(() => import('react-filepond').then(module => {
  const { registerPlugin } = module;
  const FilePondPluginImageExifOrientation = require('filepond-plugin-image-exif-orientation');
  const FilePondPluginImagePreview = require('filepond-plugin-image-preview');
  registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

  return module.FilePond;
}), { ssr: false });

export default function FilePondComponents() {
  const [files, setFiles] = useState<ActualFileObject[]>([]);

  const handleUpdateFiles = (fileItems: FilePondFile[]) => {
    const validFiles = fileItems.filter(fileItem => {
      const file = fileItem.file;
      if (file.type === 'image/png' || 'image/jpeg') {
        return true;
      } else {
        toast.warning('Apenas arquivos PNG são permitidos');
        return false;
      }
    });

    setFiles(validFiles.map(fileItem => fileItem.file));
  };

  const uploadFile = async () => {
    if (files.length === 0) {
      console.error("Nenhum arquivo selecionado");
      return;
    }

    const formData = new FormData();
    formData.append('name', files[0].name);
    formData.append('file', files[0]);

    try {
      const res = await axios.post(
        `https://zgs-image-production.up.railway.app/images/39ad2444-109a-4020-92cc-044926ab2b03`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkwNDlkYWMxLWUyYjEtNGJjOC05NzQ2LWRmMmZhNmUxYWYyZSIsIm5hbWUiOiJOZWN0YSIsImVtYWlsIjoiYWRtaW5AenN5c3RlbXMuY29tLmJyIiwiaWF0IjoxNzIzNzI5OTQ3LCJleHAiOjE3MjM4MTYzNDcsInN1YiI6IjkwNDlkYWMxLWUyYjEtNGJjOC05NzQ2LWRmMmZhNmUxYWYyZSJ9.nKlHAKXUZ-PJHjbEVXG-OnZW46_3vmAFnADbMWJZ-fQ`
          }
        }
      );
      console.log(res.data);
      toast.success('Arquivo enviado com sucesso!');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao enviar o arquivo');
    }
  };

  return (
    <div className="h-full flex flex-col">
      <FilePond
        files={files}
        allowMultiple={true}
        allowReorder={true}
        maxFiles={1}
        server={null}
        name="filepond"
        onupdatefiles={handleUpdateFiles}
        labelIdle={`Arraste ou solte o arquivo aqui <span class="filepond--label-action">Navegar</span>`}
      />
      <button onClick={uploadFile} className="mt-4">
        Upload
      </button>
    </div>
  );
}

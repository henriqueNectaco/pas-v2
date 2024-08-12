import { useState } from 'react';
import dynamic from 'next/dynamic';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import axios from 'axios';
import { Button } from '@nextui-org/button';
import { toast } from 'sonner';

// Dinamicamente importar o componente FilePond e registrar os plugins
const FilePond = dynamic(() => import('react-filepond').then(module => {
  const { registerPlugin } = module;
  const FilePondPluginImageExifOrientation = require('filepond-plugin-image-exif-orientation');
  const FilePondPluginImagePreview = require('filepond-plugin-image-preview');
  registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

  return module.FilePond;
}), { ssr: false });

export default function FilePondss() {
  const [files, setFiles] = useState([]);

  // Função para inicializar o FilePond
  const handleInit = () => {
    console.log("FilePond instance has initialized");
  };

  // Função para atualizar a lista de arquivos selecionados
  const handleUpdateFiles = (fileItems: any) => {
    setFiles(fileItems.map(fileItem => fileItem.file));
  };

  // Função para realizar o upload do arquivo selecionado
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
        'https://zgs-image-production.up.railway.app/images/39ad2444-109a-4020-92cc-044926ab2b03',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkwNDlkYWMxLWUyYjEtNGJjOC05NzQ2LWRmMmZhNmUxYWYyZSIsIm5hbWUiOiJOZWN0YSIsImVtYWlsIjoiYWRtaW5AenN5c3RlbXMuY29tLmJyIiwiaWF0IjoxNzIzNDY5Nzk4LCJleHAiOjE3MjM1NTYxOTgsInN1YiI6IjkwNDlkYWMxLWUyYjEtNGJjOC05NzQ2LWRmMmZhNmUxYWYyZSJ9.huodAs-noDbLiOTxjdUBfYJOnXJ4g3YxxQWsgeERO_0`
          }
        }
      );
      console.log(res.data);
      if (res.data.success === true) {
        toast.success('deu bom')
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-full">
      <FilePond
        files={files}
        allowMultiple={true}
        allowReorder={true}
        maxFiles={1}
        server={null}
        name="filepond"
        oninit={handleInit}
        onupdatefiles={handleUpdateFiles}
        labelIdle={`Arraste ou solte o arquivo <span class="filepond--label-action">Navegar</span>`}
      />
      {files.length !== 0 && (
        <Button onPress={upload}>Upload</Button>
      )}

    </div>
  );
}

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useField } from '@unform/core';
import { MdImage } from 'react-icons/md';

import api from '../../services/api';

import { Container } from './styles';

const AvatarInput: React.FC = () => {
  const inputRef = useRef(null);

  const { fieldName, defaultValue, registerField } = useField('avatar');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'dataset.file',
    });
  }, [fieldName, registerField]);

  const handleSelectAvatar = useCallback(async event => {
    const data = new FormData();

    data.append('file', event.target.files[0]);

    const response = await api.post('/files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }, []);

  return (
    <Container>
      <label htmlFor="avatar">
        {preview ? (
          <img src={preview} alt="avatar" />
        ) : (
            <div>
              <MdImage /> <strong>Adicionar foto</strong>
            </div>
          )}

        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={file}
          onChange={handleSelectAvatar}
          ref={inputRef}
        />
      </label>
    </Container>
  );
};

export default AvatarInput;

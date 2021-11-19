export interface AddBookModel {
  name: string;
  description: string;
  picture?: FileList | null;
}

export const validateModel = (key: keyof AddBookModel, value: any): string | null => {
  if (key === 'name') {
    return !Boolean(value)
      ? `Напишите название книги`
      : value.length < 3
        ? 'Короткое название '
        : null;
  }
  if (key === 'description') {
    return !Boolean(value)
      ? `Напишите описание`
      : value.length < 10
        ? 'Короткое описание книги'
        : null;
  }
  if (key === 'picture') {
    if (!value) {
      return null
    }
    if (value[0].type.includes('image')) {
      return null
    } else {
      return `Проверьте формат файла`;
    }
  }
  return Boolean(value) ? null : 'Заполните поле';
};
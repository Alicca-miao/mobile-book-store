// src/stores/bookStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';

// 定义书籍信息的类型
interface Book {
  id: string;
  name: string;
  author: string;
  images: string;
  ratings: string;
  wordcount: string;
  type: string;
  intro: string;
  serialize: string;
  like: string;
}

// 定义 Store
export const useBookStore = defineStore('bookStore', () => {
  // 书籍信息列表
  const books = ref<Book[]>([]); // 初始化为空数组

  // 添加书籍
  const addBook = (book: Book) => {
    books.value.push(book);
  };

  // 清除所有书籍
  const clearBooks = () => {
    books.value = [];
  };

  // 更新书籍信息
  const updateBook = (id: string, updatedBook: Partial<Book>) => {
    const index = books.value.findIndex(book => book.id === id);
    if (index !== -1) {
      books.value[index] = { ...books.value[index], ...updatedBook };
    }
  };

  return {
    books,
    addBook,
    clearBooks,
    updateBook,
  };
});

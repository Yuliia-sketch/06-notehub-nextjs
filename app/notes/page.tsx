// import "modern-normalize";
// import { useState, useEffect } from "react";
// import NoteList from "./Notes.client";
// import NoteForm from "../../components/NoteForm/NoteForm";
// import Pagination from "../../components/Pagination/Pagination";
// import SearchBox from "../../components/SearchBox/SearchBox";
// import Modal from "../../components/Modal/Modal";
// import toast, { Toaster } from "react-hot-toast";
// import { fetchNotes } from "../../lib/api";
// import { useQuery, keepPreviousData } from "@tanstack/react-query";
// import css from "./App.module.css";

// export default function App() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [query, setQuery] = useState("");
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [debouncedQuery, setDebouncedQuery] = useState("");

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedQuery(query);
//     }, 500);

//     return () => {
//       clearTimeout(handler);
//     };
//   }, [query]);

//   const { data, isSuccess } = useQuery({
//     queryKey: ["notes", debouncedQuery, currentPage],
//     queryFn: () => fetchNotes(debouncedQuery, currentPage),
//     placeholderData: keepPreviousData,
//   });

//   useEffect(() => {
//     if (isSuccess && data?.notes.length === 0 && query.length > 0) {
//       toast.error("No notes found for your request.");
//     }
//   }, [isSuccess, data, query]);

//   const totalPages = data?.totalPages ?? 0;
//   const handleSearch = (searchTerm: string) => {
//     setQuery(searchTerm);
//     setCurrentPage(1);
//   };

//   return (
//     <div className={css.app}>
//       <Toaster position="top-right" />
//       <header className={css.toolbar}>
//         <SearchBox value={query} onSearch={handleSearch} />
//         {isSuccess && totalPages > 1 && (
//           <Pagination
//             totalPages={totalPages}
//             currentPage={currentPage}
//             onPageChange={setCurrentPage}
//           />
//         )}
//         <button
//           className={css.button}
//           onClick={() => setIsCreateModalOpen(true)}
//         >
//           Create note +
//         </button>
//       </header>
//       {data && data.notes.length > 0 && (
//         <NoteList notes={data.notes} onSelect={() => {}} />
//       )}
//       {isCreateModalOpen && (
//         <Modal onClose={() => setIsCreateModalOpen(false)}>
//           <NoteForm onCancel={() => setIsCreateModalOpen(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "../../lib/api";
import NotesClient from "./Notes.client";

export default async function Notes() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1],
    queryFn: () => fetchNotes("", 1),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
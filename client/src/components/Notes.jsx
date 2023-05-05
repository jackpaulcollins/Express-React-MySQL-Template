import React, { useEffect, useState } from 'react';
import api from '../utils/api';

function Notes() {
  const [notes, setNotes] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchNotes = async () => {
    try {
      const response = await api.get('/notes');
      setNotes(response.data.notes);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.response.status);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {errorMessage}
      {notes && notes.map((note) => (
        <li key={note.id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
          <a href={`/notes/${note.id}`}>
            <div className="flex w-full items-center justify-between space-x-6 p-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <span className="inline-flex flex-shrink-0 items-center px-1.5 py-0.5 text-xs font-medium">
                    {note.content}
                  </span>
                </div>
              </div>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default Notes;

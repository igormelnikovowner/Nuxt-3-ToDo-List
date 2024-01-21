export default function useDialog () {
  const userStore = useUserStore();
  const { deleteNote, editNote, deleteTodo, editTodo } = userStore;
  const { notes } = storeToRefs(userStore);

  const isDialogOpen = ref(false);

  const noteForConfirm = ref(0);
  const todoForConfirm = ref(0);
  const actionForConfirm = ref('');
  const newNoteTitle = ref('');

  const showDialog = (payload: { action: string, uid: number, todoUid?: number, title?: string }) => {
    isDialogOpen.value = true;
    noteForConfirm.value = payload.uid;
    actionForConfirm.value = payload.action;
    if (payload.todoUid) {
      todoForConfirm.value = payload.todoUid;
    }
    if (payload.title) {
      newNoteTitle.value = payload.title;
    }
  };

  const closeDialog = () => {
    isDialogOpen.value = false;
    actionForConfirm.value = '';
    noteForConfirm.value = 0;
  };

  const confirmAction = (type?: string) => {
    if (actionForConfirm.value === 'delete') {
      deleteNote(noteForConfirm.value);
    }
    if (actionForConfirm.value === 'edit') {
      const note = notes.value.find((n) => n.uid === noteForConfirm.value) || {} as INote;
      if (note.title !== newNoteTitle.value) {
        note.title = newNoteTitle.value;
      }
      editNote(note);
    }
    if (actionForConfirm.value === 'delete-todo') {
      deleteTodo(noteForConfirm.value, todoForConfirm.value);
    }
    if (actionForConfirm.value === 'edit-todo') {
      const note = notes.value.find((n) => n.uid === noteForConfirm.value) || {} as INote;
      const todo = note.todos.find((t) => t.uid === todoForConfirm.value) || {} as ITodo;
      editTodo(todo, noteForConfirm.value);
    }

    if (type === 'note' && actionForConfirm.value === 'delete') {
      toNotesLayout();
    }
    isDialogOpen.value = false;
    actionForConfirm.value = '';
    noteForConfirm.value = 0;
    todoForConfirm.value = 0;
  }

  const toNotesLayout = () => {
    navigateTo("/notes");
  };

  return { isDialogOpen, noteForConfirm, actionForConfirm, showDialog, closeDialog, confirmAction, toNotesLayout };
};


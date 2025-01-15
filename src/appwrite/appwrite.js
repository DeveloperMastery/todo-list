import { Account, Client, Databases, ID, OAuthProvider } from "appwrite";

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(import.meta.env.VITE_PROJECT_ID);
const account = new Account(client);
const databases = new Databases(client)

const getSession = async () => {
  try {
    return await account.get();
  } catch (error) {
    console.error('Not logged in:', error);
    return null;
  }
};

const login = async function () {
  try {
    // Using the current URL as success/failure URL
    // const currentURL = 'https://idx.google.com/todo-list-3315522';
    const currentURL = 'https://todo-list-dqwf.onrender.com/'
    const session = await account.createOAuth2Session(
      'google',
      currentURL,  // success URL
      currentURL,  // failure URL
      ['email', 'profile'],  // scopes
      null,
      null,
      'popup'
    );
    return session;
  } catch (error) {
    console.error('Error while logging in:', error);
    throw error;
  }
}

const logout = async () => {
  try {
    await account.deleteSession('current');
  } catch (error) {
    console.error('Logout error:', error);
  }
};

const getDocuments = async() => {
  const data = await databases.listDocuments(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTION_ID,
      []
  )
  return data
}

const createDocument = async (newTodo) => {
  const result = await databases.createDocument(
    import.meta.env.VITE_DATABASE_ID,
    import.meta.env.VITE_COLLECTION_ID,
    ID.unique(),
    newTodo,
    []
  )
  return result
}

const deleteDocument = async(selectedDocumentId) => {
  await databases.deleteDocument(import.meta.env.VITE_DATABASE_ID, import.meta.env.VITE_COLLECTION_ID, selectedDocumentId)
}

const updateDocument = async (selectedDocumentId, updatedDocument) => {
  await databases.updateDocument(import.meta.env.VITE_DATABASE_ID, import.meta.env.VITE_COLLECTION_ID, selectedDocumentId, updatedDocument)
}

export { account, databases, createDocument, login, getSession, logout, getDocuments, deleteDocument, updateDocument }
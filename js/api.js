export async function getTaskSuggestions() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");

  if (!response.ok) {
    throw new Error("Erreur lors du chargement des suggestions");
  }

  return await response.json();
}
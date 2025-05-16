import { ProjectListItemProps } from '../components/ProjectListItem';

export const fetchProjectsAPI = async (
  token: string
): Promise<ProjectListItemProps[]> => {
  const response = await fetch(
    'https://api.rork-direct.workers.dev/api/projects',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    const errorBody = await response.text();
    console.error('API Error Response:', errorBody);
    throw new Error(
      `Network response was not ok: ${response.status} ${response.statusText}`
    );
  }
  return response.json();
};

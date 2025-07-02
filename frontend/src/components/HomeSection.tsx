
import { useQuery } from '@tanstack/react-query';
import { ItemTile } from './ItemTile';
import { apiClient } from '../services/api';
import { useAuth } from '../hooks/useAuth';

export function HomeSection() {
  const { user } = useAuth();
  
  const { data: itemsData, isLoading, error } = useQuery({
    queryKey: ['items'],
    queryFn: () => apiClient.getItems({ limit: 50 }),
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hi, {user?.email || 'Guest'} 👋</h1>
          <p className="text-muted-foreground mt-1">Discover and get inspired by everyone's bucket list tasks!</p>
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hi, {user?.email || 'Guest'} 👋</h1>
          <p className="text-muted-foreground mt-1">Discover and get inspired by everyone's bucket list tasks!</p>
        </div>
        <div className="text-center py-12">
          <p className="text-red-600">Failed to load tasks. Please try again.</p>
        </div>
      </div>
    );
  }

  const items = itemsData?.data || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hi, {user?.email || 'Guest'} 👋</h1>
          <p className="text-muted-foreground mt-1">Discover and get inspired by everyone's bucket list tasks!</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <ItemTile
            key={item.id}
            item={item}
            currentUserId={user?.id}
          />
        ))}
      </div>
      
      {items.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No tasks to display</p>
        </div>
      )}
    </div>
  );
}

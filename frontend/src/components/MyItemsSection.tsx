
import { useQuery } from '@tanstack/react-query';
import { ItemTile } from './ItemTile';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { apiClient } from '../services/api';
import { useAuth } from '../hooks/useAuth';

export function MyItemsSection() {
  const { user } = useAuth();
  
  // Fetch completed items
  const { data: completedData } = useQuery({
    queryKey: ['items', 'completed'],
    queryFn: () => apiClient.getItems({ get_completed: true }),
    enabled: !!user,
  });

  // Fetch owned items
  const { data: ownedData } = useQuery({
    queryKey: ['items', 'owned'],
    queryFn: () => apiClient.getItems({ get_owned: true }),
    enabled: !!user,
  });

  // Fetch all items to filter favorites (this would ideally be a separate endpoint)
  const { data: allItemsData } = useQuery({
    queryKey: ['items', 'all'],
    queryFn: () => apiClient.getItems({ limit: 1000 }),
    enabled: !!user,
  });

  const completedItems = completedData?.data || [];
  const ownedItems = ownedData?.data || [];
  // Note: In a real implementation, you'd want a favorites endpoint or user preferences
  const favoritedItems = allItemsData?.data || [];

  const renderItemGrid = (itemList: typeof completedItems, emptyMessage: string) => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {itemList.map((item) => (
          <ItemTile
            key={item.id}
            item={item}
            currentUserId={user?.id}
          />
        ))}
      </div>
      
      {itemList.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{emptyMessage}</p>
        </div>
      )}
    </>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Tasks</h1>
        <p className="text-muted-foreground mt-1">Track your bucket list progress: completed achievements, favorites, and your own tasks</p>
      </div>
      
      <Tabs defaultValue="completed" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="completed" className="flex items-center gap-2">
            Completed
            <Badge variant="secondary" className="text-xs">
              {completedItems.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="favorited" className="flex items-center gap-2">
            Favorited
            <Badge variant="secondary" className="text-xs">
              {favoritedItems.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="owned" className="flex items-center gap-2">
            My Tasks
            <Badge variant="secondary" className="text-xs">
              {ownedItems.length}
            </Badge>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="completed" className="space-y-4">
          {renderItemGrid(completedItems, "No completed tasks yet - time to start achieving!")}
        </TabsContent>
        
        <TabsContent value="favorited" className="space-y-4">
          {renderItemGrid(favoritedItems, "No favorited tasks yet - explore and find inspiration!")}
        </TabsContent>
        
        <TabsContent value="owned" className="space-y-4">
          {renderItemGrid(ownedItems, "No tasks created yet - share your bucket list ideas!")}
        </TabsContent>
      </Tabs>
    </div>
  );
}

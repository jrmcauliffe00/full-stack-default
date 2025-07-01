
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { apiClient } from '../services/api';

export function AdminSection() {
  const { data: itemsData } = useQuery({
    queryKey: ['items', 'admin'],
    queryFn: () => apiClient.getItems({ limit: 1000 }),
  });

  const items = itemsData?.data || [];
  const totalItems = items.length;
  const completedItems = 0; // This would need to be tracked separately
  const inProgressItems = 0; // This would need to be tracked separately  
  const pendingItems = totalItems;
  const favoritedItems = items.reduce((sum, item) => sum + (item.favorites || 0), 0);

  const stats = [
    { label: 'Total Items', value: totalItems, color: 'bg-blue-500' },
    { label: 'Completed', value: completedItems, color: 'bg-green-500' },
    { label: 'In Progress', value: inProgressItems, color: 'bg-yellow-500' },
    { label: 'Pending', value: pendingItems, color: 'bg-red-500' },
    { label: 'Total Favorites', value: favoritedItems, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">System overview and management</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="animate-fade-in">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${stat.color}`} />
                <span className="text-2xl font-bold">{stat.value}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle>Recent Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {items.slice(0, 5).map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="font-medium">{item.title}</span>
                  <Badge variant="outline" className="text-xs">
                    {item.type || 'General'}
                  </Badge>
                </div>
                <span className="text-sm text-muted-foreground">
                  {item.favorites || 0} favorites
                </span>
              </div>
            ))}
            {items.length === 0 && (
              <p className="text-center text-muted-foreground py-4">No items found</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

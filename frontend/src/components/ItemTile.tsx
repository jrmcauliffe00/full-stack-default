
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, User } from 'lucide-react';
import { ItemPublic } from '../types/api';

interface ItemTileProps {
  item: ItemPublic;
  onToggleFavorite?: (id: string) => void;
  currentUserId?: string;
  userCompletedItems?: string[];
  userFavoritedItems?: string[];
}

export function ItemTile({ 
  item, 
  onToggleFavorite, 
  currentUserId,
  userCompletedItems = [],
  userFavoritedItems = []
}: ItemTileProps) {
  const isCompleted = userCompletedItems.includes(item.id);
  const isFavorited = userFavoritedItems.includes(item.id);
  const isOwned = item.owner_id === currentUserId;

  const getDifficultyColor = (difficulty?: string | null) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'hard':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getTypeColor = (type?: string | null) => {
    const colors: Record<string, string> = {
      travel: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      adventure: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
      personal: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
      skill: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
      fitness: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
      creative: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
    };
    return colors[type?.toLowerCase() || ''] || 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
  };

  return (
    <Card className="tile-shadow hover-scale animate-fade-in group cursor-pointer transition-all duration-200 hover:border-primary/20">
      {item.picture && (
        <div className="relative h-32 w-full overflow-hidden rounded-t-lg">
          <img 
            src={item.picture.startsWith('http') ? item.picture : `https://images.unsplash.com/${item.picture}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite?.(item.id);
              }}
              className="h-8 w-8 p-0 bg-black/20 hover:bg-black/40 backdrop-blur-sm"
            >
              <Star 
                className={`h-4 w-4 transition-colors ${
                  isFavorited 
                    ? 'fill-yellow-400 text-yellow-400' 
                    : 'text-white hover:text-yellow-400'
                }`}
              />
            </Button>
          </div>
        </div>
      )}
      
      <CardHeader className={`pb-3 ${item.picture ? 'pt-4' : ''}`}>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
            {item.title}
          </CardTitle>
          {!item.picture && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite?.(item.id);
              }}
              className="h-8 w-8 p-0 shrink-0"
            >
              <Star 
                className={`h-4 w-4 transition-colors ${
                  isFavorited 
                    ? 'fill-yellow-400 text-yellow-400' 
                    : 'text-muted-foreground hover:text-yellow-400'
                }`}
              />
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {item.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {item.description}
          </p>
        )}
        
        <div className="flex items-center gap-2 flex-wrap">
          {isCompleted && (
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" variant="secondary">
              Completed
            </Badge>
          )}
          
          {item.difficulty && (
            <Badge className={getDifficultyColor(item.difficulty)} variant="secondary">
              {item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1)}
            </Badge>
          )}
          
          {item.type && (
            <Badge className={getTypeColor(item.type)} variant="secondary">
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            </Badge>
          )}
          
          {isOwned && (
            <Badge variant="outline" className="text-xs">
              <User className="h-3 w-3 mr-1" />
              Owned
            </Badge>
          )}
        </div>

        {item.location && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{item.location}</span>
          </div>
        )}
        
        {item.rating && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span>{item.rating.toFixed(1)}</span>
          </div>
        )}
        
        {item.tags && item.tags.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            {item.tags.slice(0, 3).map((tag) => (
              <span 
                key={tag}
                className="text-xs bg-muted px-2 py-1 rounded-md text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
            {item.tags.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{item.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

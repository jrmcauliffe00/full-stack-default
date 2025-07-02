import {
  Box,
  Badge,
  IconButton,
  Image,
  Text,
  Heading,
  HStack,
  Flex,
  Wrap,
  WrapItem,
} from "@chakra-ui/react"
import {
  useColorModeValue,
} from "@/components/ui/color-mode"
import { Star, MapPin, User } from "lucide-react"
import { ItemPublic } from "@/client/types.gen"

interface ItemTileProps {
  item: ItemPublic
  onToggleFavorite?: (id: string) => void
  currentUserId?: string
  userCompletedItems?: string[]
  userFavoritedItems?: string[]
}

export function ItemTile({
  item,
  onToggleFavorite,
  currentUserId,
  userCompletedItems = [],
  userFavoritedItems = [],
}: ItemTileProps) {
  const isCompleted = userCompletedItems.includes(item.id)
  const isFavorited = userFavoritedItems.includes(item.id)
  const isOwned = item.owner_id === currentUserId

  const difficultyColor = {
    easy: "green",
    medium: "yellow",
    hard: "red",
  }[item.difficulty?.toLowerCase() || ""] || "gray"

  const typeColor = {
    travel: "blue",
    adventure: "orange",
    personal: "purple",
    skill: "indigo",
    fitness: "teal",
    creative: "pink",
  }[item.type?.toLowerCase() || ""] || "gray"

  const bgCard = useColorModeValue("white", "gray.800")
  const hoverBorder = useColorModeValue("gray.200", "gray.600")

  return (
    <Box
      bg={bgCard}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="sm"
      _hover={{ boxShadow: "md", borderColor: hoverBorder as any }}
      transition="all 0.2s"
      cursor="pointer"
    >
      {item.picture && (
        <Box position="relative" height="130px" overflow="hidden">
          <Image
            src={
              item.picture.startsWith("http")
                ? item.picture
                : `https://images.unsplash.com/${item.picture}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`
            }
            alt={item.title}
            objectFit="cover"
            width="100%"
            height="100%"
            transition="transform 0.2s"
            _groupHover={{ transform: "scale(1.05)" }}
          />
          <IconButton
            aria-label="Toggle favorite"
            position="absolute"
            top="2"
            right="2"
            size="sm"
            variant="ghost"
            bg="blackAlpha.300"
            _hover={{ bg: "blackAlpha.500" }}
            color={isFavorited ? "yellow.400" : "white"}
            onClick={(e) => {
              e.stopPropagation()
              onToggleFavorite?.(item.id)
            }}
          />
        </Box>
      )}

      <Box px={4} pt={item.picture ? 4 : 6} pb={4}>
        <Flex justify="space-between" align="start" mb={2}>
          <Heading size="sm" as="h2">
            {item.title}
          </Heading>
          {!item.picture && (
            <IconButton
              aria-label="Toggle favorite"
              size="sm"
              variant="ghost"
              color={isFavorited ? "yellow.400" : "gray.500"}
              onClick={(e) => {
                e.stopPropagation()
                onToggleFavorite?.(item.id)
              }}
            />
          )}
        </Flex>

        {item.description && (
          <Text fontSize="sm" color="gray.500" mb={2} as="p">
            {item.description}
          </Text>
        )}

        <Wrap gap={2} mt={2} mb={2}>
          {isCompleted && (
            <WrapItem>
              <Badge colorScheme="green">Completed</Badge>
            </WrapItem>
          )}
          {item.difficulty && (
            <WrapItem>
              <Badge colorScheme={difficultyColor}>
                {item.difficulty.charAt(0).toUpperCase() + item.difficulty.slice(1)}
              </Badge>
            </WrapItem>
          )}
          {item.type && (
            <WrapItem>
              <Badge colorScheme={typeColor}>
                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
              </Badge>
            </WrapItem>
          )}
          {isOwned && (
            <WrapItem>
              <Badge variant="outline" fontSize="xs">
                <User size={12} style={{ marginRight: "4px" }} />
                Owned
              </Badge>
            </WrapItem>
          )}
        </Wrap>

        {item.location && (
          <HStack gap={1} fontSize="xs" color="gray.500" mb={1}>
            <MapPin size={12} />
            <Text>{item.location}</Text>
          </HStack>
        )}

        {item.rating && (
          <HStack gap={1} fontSize="xs" color="yellow.400" mb={1}>
            <Star size={12} />
            <Text>{item.rating.toFixed(1)}</Text>
          </HStack>
        )}

        {item.tags && item.tags.length > 0 && (
          <Wrap gap={2} mt={2}>
            {item.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} fontSize="xs" colorScheme="gray">
                #{tag}
              </Badge>
            ))}
            {item.tags.length > 3 && (
              <Text fontSize="xs" color="gray.500">
                +{item.tags.length - 3} more
              </Text>
            )}
          </Wrap>
        )}
      </Box>
    </Box>
  )
}

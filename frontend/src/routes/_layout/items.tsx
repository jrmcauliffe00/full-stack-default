import {
  Box,
  Container,
  EmptyState,
  Flex,
  Heading,
  SimpleGrid,
  VStack,
  Text,
  Center,
} from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { FiSearch } from "react-icons/fi"
import { z } from "zod"

import { ItemsService } from "@/client"
// import { ItemActionsMenu } from "@/components/Common/ItemActionsMenu"
import AddItem from "@/components/Items/AddItem"
import PendingItems from "@/components/Pending/PendingItems"
// import {
//   PaginationItems,
//   PaginationNextTrigger,
//   PaginationPrevTrigger,
//   PaginationRoot,
// } from "@/components/ui/pagination.tsx"

import { ItemTile } from "@/components/ItemTile"

const itemsSearchSchema = z.object({
  page: z.number().catch(1),
})

const PER_PAGE = 5

function getItemsQueryOptions({ page }: { page: number }) {
  return {
    queryFn: () =>
      ItemsService.readItems({ skip: (page - 1) * PER_PAGE, limit: PER_PAGE }),
    queryKey: ["items", { page }],
  }
}

export const Route = createFileRoute("/_layout/items")({
  component: Items,
  validateSearch: (search) => itemsSearchSchema.parse(search),
})

function ItemsTable() {
  const { page } = Route.useSearch()

  const { data, isLoading } = useQuery({
    ...getItemsQueryOptions({ page }),
    placeholderData: (prevData) => prevData,
  })


  const items = data?.data.slice(0, PER_PAGE) ?? []

  if (isLoading) {
    return <PendingItems />
  }

  if (items.length === 0) {
    return (
      <EmptyState.Root>
        <EmptyState.Content>
          <EmptyState.Indicator>
            <FiSearch />
          </EmptyState.Indicator>
          <VStack textAlign="center">
            <EmptyState.Title>You don't have any items yet</EmptyState.Title>
            <EmptyState.Description>
              Add a new item to get started
            </EmptyState.Description>
          </VStack>
        </EmptyState.Content>
      </EmptyState.Root>
    )
  }

  return (
      <VStack align="stretch" gap={6}>
        <Flex justify="space-between" align="center">
          <Box>
            <Heading size="lg">Hi 👋</Heading>
            <Text color="gray.500" mt={1}>
              Discover and get inspired by everyone's bucket list tasks!
            </Text>
          </Box>
        </Flex>
  
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
          gap={4}
        >
          {items.map((item) => (
            <ItemTile key={item.id} item={item} />
          ))}
        </SimpleGrid>
  
        {items.length === 0 && (
          <Center py={12}>
            <Text color="gray.500">No tasks to display</Text>
          </Center>
        )}
      </VStack>
    )
}

function Items() {
  return (
    <Container maxW="full">
      <Heading size="lg" pt={12}>
        Items Management
      </Heading>
      <AddItem />
      <ItemsTable />
    </Container>
  )
}

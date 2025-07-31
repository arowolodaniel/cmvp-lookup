'use client';

import {
  Box,
  Input,
  Button,
  VStack,
  Text,
  HStack,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useState } from 'react';

interface SearchFormProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
}

export function SearchForm({ onSearch, isLoading = false }: SearchFormProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      return;
    }

    onSearch(searchQuery.trim());
  };

  return (
    <Box as="form" onSubmit={handleSubmit} w="full" maxW="600px">
      <VStack gap={4}>
        <Text
          fontSize="lg"
          color="gray.600"
          textAlign="center"
          mb={2}
        >
          Search for CSEAN members by name, membership number, email, or organization
        </Text>
        
        <HStack w="full" gap={2}>
          <Input
            placeholder="Enter name, membership number, email, or organization..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            bg="white"
            borderColor="gray.300"
            _focus={{
              borderColor: 'brand.500',
              boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
            }}
            _hover={{
              borderColor: 'gray.400',
            }}
            size="lg"
          />
          <Button
            type="submit"
            colorScheme="brand"
            size="lg"
            px={8}
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
} 
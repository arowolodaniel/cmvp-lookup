'use client';

import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  Icon,
} from '@chakra-ui/react';
import { CheckCircleIcon, CloseIcon, TimeIcon } from '@chakra-ui/icons';
import { CSEANMember } from '../data/mock-data';

interface MemberCardProps {
  member: CSEANMember;
}

export function MemberCard({ member }: MemberCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'green';
      case 'Inactive':
        return 'red';
      case 'Pending':
        return 'yellow';
      case 'Expired':
        return 'orange';
      default:
        return 'gray';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return CheckCircleIcon;
      case 'Inactive':
        return CloseIcon;
      case 'Pending':
      case 'Expired':
        return TimeIcon;
      default:
        return TimeIcon;
    }
  };

  return (
    <Box
      bg="white"
      borderRadius="lg"
      p={6}
      shadow="md"
      border="1px"
      borderColor="gray.200"
      _hover={{
        shadow: 'lg',
        transform: 'translateY(-2px)',
        transition: 'all 0.2s',
      }}
    >
      <VStack align="stretch" gap={4}>
        {/* Header */}
        <HStack justify="space-between" align="flex-start">
          <VStack align="flex-start" gap={1}>
            <Text fontSize="xl" fontWeight="bold" color="gray.800">
              {member.name}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {member.membershipNumber}
            </Text>
          </VStack>
          <VStack align="flex-end" gap={1}>
            <Badge
              colorScheme={getStatusColor(member.membershipStatus)}
              variant="solid"
              px={3}
              py={1}
              borderRadius="full"
            >
              <HStack gap={1}>
                <Icon as={getStatusIcon(member.membershipStatus)} boxSize={3} />
                <Text fontSize="xs">{member.membershipStatus}</Text>
              </HStack>
            </Badge>
            {member.verified && (
              <Badge colorScheme="blue" variant="outline" fontSize="xs">
                Verified
              </Badge>
            )}
          </VStack>
        </HStack>

        <Box borderTop="1px" borderColor="gray.200" pt={4} />

        {/* Contact Information */}
        <VStack align="flex-start" gap={2}>
          <Text fontSize="sm" color="gray.600">
            <strong>Email:</strong> {member.email}
          </Text>
          <Text fontSize="sm" color="gray.600">
            <strong>Phone:</strong> {member.phone}
          </Text>
          <Text fontSize="sm" color="gray.600">
            <strong>Organization:</strong> {member.organization}
          </Text>
          <Text fontSize="sm" color="gray.600">
            <strong>Position:</strong> {member.position}
          </Text>
        </VStack>

        <Box borderTop="1px" borderColor="gray.200" pt={4} />

        {/* Additional Details */}
        <VStack align="flex-start" gap={2}>
          <HStack gap={4}>
            <Text fontSize="sm" color="gray.600">
              <strong>Type:</strong> {member.membershipType}
            </Text>
            <Text fontSize="sm" color="gray.600">
              <strong>Region:</strong> {member.region}
            </Text>
          </HStack>
          <Text fontSize="sm" color="gray.600">
            <strong>Join Date:</strong> {new Date(member.joinDate).toLocaleDateString()}
          </Text>
          <Text fontSize="sm" color="gray.600">
            <strong>Expiry Date:</strong> {new Date(member.expiryDate).toLocaleDateString()}
          </Text>
        </VStack>

        {/* Specializations */}
        {member.specialization.length > 0 && (
          <>
            <Box borderTop="1px" borderColor="gray.200" pt={4} />
            <VStack align="flex-start" gap={2}>
              <Text fontSize="sm" fontWeight="semibold" color="gray.700">
                Specializations:
              </Text>
              <HStack gap={2} flexWrap="wrap">
                {member.specialization.map((spec, index) => (
                  <Badge
                    key={index}
                    colorScheme="brand"
                    variant="subtle"
                    fontSize="xs"
                    px={2}
                    py={1}
                  >
                    {spec}
                  </Badge>
                ))}
              </HStack>
            </VStack>
          </>
        )}
      </VStack>
    </Box>
  );
} 
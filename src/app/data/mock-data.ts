export interface CSEANMember {
  _id: string;
  membershipNumber: string;
  firstName: string;
  lastName: string;
  otherName?: string;
  membershipCategory: 'professional' | 'student' | 'corporate' | 'associate' | 'fellow' | 'unassigned' | 'affiliate';
  status: 'active' | 'inactive' | 'pending' | 'expired' | 'suspended';
  membershipStartDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface SearchResponse {
  count: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  members: CSEANMember[];
  message?: string;
  error?: string;
}

const API_BASE_URL = 'https://backendsandbox.csean.org.ng/api/v1';

export const searchMembers = async (query: string, page: number = 1, limit: number = 20): Promise<SearchResponse> => {
  try {
    // Determine if query is a member ID (numeric) or name
    const isMemberId = /^\d+$/.test(query);
    
    const params = new URLSearchParams();
    
    if (isMemberId) {
      params.append('memberId', query);
    } else {
      params.append('name', query);
    }
    
    // Add pagination parameters
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    
    const response = await fetch(`${API_BASE_URL}/users/whois?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return {
          count: 0,
          totalPages: 0,
          currentPage: 1,
          hasNextPage: false,
          hasPrevPage: false,
          members: []
        };
      }
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    
    // Return the full response object for pagination
    return data;
  } catch (error) {
    console.error('Search error:', error);
    throw new Error('Failed to search members. Please try again.');
  }
}; 
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { searchMembers, CSEANMember, SearchResponse } from './data/mock-data';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<CSEANMember[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState('');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [resultsPerPage] = useState(20);

  const handleSearch = async (e: React.FormEvent, page: number = 1) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setError('');
    setCurrentPage(page);

    try {
      const response: SearchResponse = await searchMembers(searchQuery, page, resultsPerPage);
      
      setSearchResults(response.members);
      setTotalPages(response.totalPages);
      setTotalCount(response.count);
      setHasNextPage(response.hasNextPage);
      setHasPrevPage(response.hasPrevPage);
      setHasSearched(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      setSearchResults([]);
      setTotalPages(0);
      setTotalCount(0);
      setHasNextPage(false);
      setHasPrevPage(false);
    } finally {
      setIsSearching(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
      handleSearch(fakeEvent, newPage);
    }
  };

  const getFullName = (member: CSEANMember) => {
    const firstName = member.firstName || '';
    const lastName = member.lastName || '';
    const otherName = member.otherName || '';
    
    if (otherName) {
      return `${firstName} ${otherName} ${lastName}`.trim();
    }
    return `${firstName} ${lastName}`.trim();
  };

  const getStatusColor = (status: string) => {
    if (!status) return 'bg-gray-100 text-gray-800 border-gray-200';
    
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'expired':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'suspended':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const capitalizeFirst = (str: string) => {
    if (!str || typeof str !== 'string') return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-4">
              <Image
                src="/cseans-logo.png"
                alt="CSEAN Logo"
                width={200}
                height={80}
                className="h-20 w-auto"
                priority
              />
            </div>
            <p className="text-xl text-gray-600 font-medium">
              CSEAN Membership Portal Verification
            </p>
            <p className="text-md text-gray-500 max-w-2xl mx-auto">
              Search and confirm the authenticity of CSEAN members and ensure transparency in membership status.
              Verify membership details, contact information, and professional credentials.
            </p>
          </div>

          {/* Search Form */}
          <div className="flex justify-center">
            <form onSubmit={handleSearch} className="w-full max-w-2xl">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Enter name or membership number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-gray-900 placeholder-gray-500"
                  style={{ color: '#111827' }}
                />
                <button
                  type="submit"
                  disabled={isSearching}
                  className="px-8 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors sm:w-auto w-full"
                  style={{ backgroundColor: '#2d7d32' }}
                >
                  {isSearching ? 'Searching...' : 'Search'}
                </button>
              </div>
            </form>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          )}

          {/* Search Results */}
          {hasSearched && (
            <div className="space-y-6">
              {isSearching ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mb-4" style={{ borderBottomColor: '#2d7d32' }}></div>
                  <p className="text-gray-600">Searching for members...</p>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-6">
                  {/* Search Results Count */}
                  <div className="text-center mb-6">
                    <p className="text-lg text-gray-600">
                      Found {totalCount} member{totalCount !== 1 ? `s` : ``}
                    </p>
                  </div>
                  
                  {/* Responsive Grid Layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                    {searchResults.map((member) => (
                      <div key={member._id} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 min-w-0">
                        {/* Header with Status Badge */}
                        <div className="flex justify-between items-start mb-5">
                          <div className="flex-1 min-w-0 pr-3">
                            <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight">{getFullName(member)}</h3>
                            <p className="text-base text-gray-600 font-mono">
                              <span className="font-semibold text-gray-700">Member ID:</span> {member.membershipNumber || 'N/A'}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-2 flex-shrink-0">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(member.status)}`}>
                              {capitalizeFirst(member.status)}
                            </span>
                          </div>
                        </div>

                        {/* Member Details - Better Layout */}
                        <div className="space-y-4">
                          {/* Category */}
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm text-gray-600 font-medium">Category</p>
                                <p className="text-base font-semibold text-gray-800">
                                  {capitalizeFirst(member.membershipCategory)}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Member Since */}
                          <div className="bg-gray-50 rounded-lg p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"></div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm text-gray-600 font-medium">Member Since</p>
                                <p className="text-base font-semibold text-gray-800">
                                  {member.membershipStartDate ? new Date(member.membershipStartDate).toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                  }) : 'N/A'}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Membership Duration */}
                          <div className="text-center">
                            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                              <span className="text-sm text-gray-600 font-medium">Membership Duration</span>
                              <span className="text-lg font-bold text-gray-800">
                                {(() => {
                                  if (!member.membershipStartDate) return 'N/A';
                                  
                                  const startDate = new Date(member.membershipStartDate);
                                  const now = new Date();
                                  const diffTime = Math.abs(now.getTime() - startDate.getTime());
                                  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                  const years = Math.floor(diffDays / 365);
                                  const months = Math.floor((diffDays % 365) / 30);
                                  
                                  if (years > 0) {
                                    return `${years}yr${years > 1 ? 's' : ''}${months > 0 ? ` ${months}mo` : ''}`;
                                  } else if (months > 0) {
                                    return `${months}mo`;
                                  } else {
                                    return `${diffDays} day${diffDays !== 1 ? 's' : ''}`;
                                  }
                                })()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-8">
                      {/* Previous Button */}
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={!hasPrevPage}
                        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        ← Previous
                      </button>

                      {/* Page Numbers */}
                      <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }

                          return (
                            <button
                              key={pageNum}
                              onClick={() => handlePageChange(pageNum)}
                              className={`px-3 py-2 rounded-md transition-colors ${
                                currentPage === pageNum
                                  ? 'bg-green-600 text-white'
                                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                      </div>

                      {/* Next Button */}
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={!hasNextPage}
                        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Next →
                      </button>
                    </div>
                  )}

                  {/* Results Info */}
                  {totalPages > 1 && (
                    <div className="text-center mt-4 text-sm text-gray-600">
                      Showing {((currentPage - 1) * resultsPerPage) + 1} to {Math.min(currentPage * resultsPerPage, totalCount)} of {totalCount} results
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center" style={{ backgroundColor: '#e8f5e8', borderColor: '#2d7d32' }}>
                  <p className="text-lg font-semibold text-green-800 mb-2" style={{ color: '#2d7d32' }}>No members found</p>
                  <p className="text-green-700" style={{ color: '#1b5e20' }}>
                    No CSEAN members match your search criteria. Please try a different search term.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Information Section */}
          {!hasSearched && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="text-center space-y-4">
                  <h2 className="text-2xl font-bold text-gray-800">About CSEAN</h2>
                  <p className="text-gray-600 leading-relaxed">
                    The Cyber Security Experts Association of Nigeria (CSEAN) is a professional body 
                    dedicated to promoting cybersecurity awareness, education, and best practices across Nigeria. 
                    Our members include cybersecurity professionals, researchers, educators, and organizations 
                    committed to securing Nigeria&apos;s digital infrastructure.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
                  <div className="space-y-3">
                    <p className="text-2xl font-bold text-green-700" style={{ color: '#2d7d32' }}>Verify</p>
                    <p className="text-sm text-gray-600">
                      Confirm the authenticity of CSEAN members and their credentials
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
                  <div className="space-y-3">
                    <p className="text-2xl font-bold text-green-700" style={{ color: '#2d7d32' }}>Transparent</p>
                    <p className="text-sm text-gray-600">
                      Ensure transparency in membership status and professional qualifications
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
                  <div className="space-y-3">
                    <p className="text-2xl font-bold text-green-700" style={{ color: '#2d7d32' }}>Trusted</p>
                    <p className="text-sm text-gray-600">
                      Build trust through verified member information and professional standards
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

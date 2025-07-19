// Mock data for demo purposes
export const mockDriver = {
  id: 'driver_demo_001',
  name: 'John Rodriguez',
  email: 'john.rodriguez@email.com',
  phone: '+1 (555) 123-4567',
  cdl_number: 'CDL123456789',
  cdl_expiry: '2025-12-31',
  truck_type: 'Dry Van',
  experience_years: 8,
  rating: 4.8,
  total_jobs: 247,
  verified: true,
  created_at: '2024-01-15'
};

export const mockJobs = [
  {
    id: 'job_001',
    shipper_name: 'ABC Logistics',
    pickup_location: 'Los Angeles, CA',
    delivery_location: 'Phoenix, AZ',
    pickup_date: '2024-01-25',
    delivery_date: '2024-01-26',
    rate: 1850,
    distance: 372,
    truck_type: 'Dry Van',
    weight: '45,000 lbs',
    commodity: 'Electronics',
    status: 'available',
    shipper_rating: 4.6,
    bids_count: 3
  },
  {
    id: 'job_002',
    shipper_name: 'West Coast Freight',
    pickup_location: 'San Diego, CA',
    delivery_location: 'Las Vegas, NV',
    pickup_date: '2024-01-26',
    delivery_date: '2024-01-27',
    rate: 1200,
    distance: 332,
    truck_type: 'Flatbed',
    weight: '38,500 lbs',
    commodity: 'Construction Materials',
    status: 'available',
    shipper_rating: 4.9,
    bids_count: 7
  },
  {
    id: 'job_003',
    shipper_name: 'Pacific Shipping Co',
    pickup_location: 'Oakland, CA',
    delivery_location: 'Portland, OR',
    pickup_date: '2024-01-27',
    delivery_date: '2024-01-28',
    rate: 2100,
    distance: 635,
    truck_type: 'Refrigerated',
    weight: '42,000 lbs',
    commodity: 'Fresh Produce',
    status: 'available',
    shipper_rating: 4.7,
    bids_count: 2
  }
];

export const mockActiveJobs = [
  {
    id: 'job_active_001',
    shipper_name: 'Global Transport Inc',
    pickup_location: 'Denver, CO',
    delivery_location: 'Salt Lake City, UT',
    pickup_date: '2024-01-24',
    delivery_date: '2024-01-25',
    rate: 1650,
    status: 'en_route_pickup',
    progress: 25,
    estimated_pickup: '14:30',
    estimated_delivery: '09:00'
  },
  {
    id: 'job_active_002',
    shipper_name: 'Mountain Logistics',
    pickup_location: 'Albuquerque, NM',
    delivery_location: 'Tucson, AZ',
    pickup_date: '2024-01-23',
    delivery_date: '2024-01-24',
    rate: 980,
    status: 'loaded',
    progress: 60,
    estimated_pickup: 'Completed',
    estimated_delivery: '16:45'
  }
];

export const mockMessages = [
  {
    id: 'msg_001',
    shipper_name: 'ABC Logistics',
    last_message: 'Pickup location has been updated to the north dock.',
    timestamp: '2024-01-24T10:30:00Z',
    unread: true,
    job_id: 'job_active_001'
  },
  {
    id: 'msg_002',
    shipper_name: 'Mountain Logistics',
    last_message: 'Great job on the delivery! Payment has been processed.',
    timestamp: '2024-01-24T08:15:00Z',
    unread: false,
    job_id: 'job_active_002'
  },
  {
    id: 'msg_003',
    shipper_name: 'West Coast Freight',
    last_message: 'Your bid has been accepted. Please confirm pickup time.',
    timestamp: '2024-01-23T16:45:00Z',
    unread: true,
    job_id: 'job_002'
  }
];

export const mockEarnings = {
  today: 1650,
  week: 8750,
  month: 28400,
  total: 156780
};

export const mockStats = {
  active_jobs: 2,
  completed_jobs: 247,
  pending_bids: 3,
  rating: 4.8
};
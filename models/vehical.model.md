
create table public.vehicless (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,

  registration_number text unique not null,
  allowed_passenger integer not null,
  is_available boolean default true,
   driver_id uuid references user(id) on  delete  set null,
   owner_id uuid references user(id) on delete cascade,

   rate_per_km numeric not null ,
   billable numeric default 0,
  vehicle_number text not null,
  vehicle_type text not null, -- car | bike | auto
  capacity integer,

  created_at timestamp with time zone default now()
);







select * from  vehicales






create table trips (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  vehicle_id uuid references public.vehicles(id) on delete cascade,
  start_location text not null,
  end_location text not null,
  status text default 'pending', 
  created_at timestamp with time zone default now()

);


select * from trips
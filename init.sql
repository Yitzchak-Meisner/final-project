CREATE TABLE public.users (
    id uuid PRIMARY KEY,
    full_name varchar(255) NOT NULL,
    email varchar(255) UNIQUE NOT NULL,
    phone varchar(20),
    birthday date,
    "password" varchar(255) NOT NULL,
    "role" varchar(50) DEFAULT 'user' NOT NULL
);

CREATE TABLE public.posts (
    id serial PRIMARY KEY,
    title varchar(150) NOT NULL,
    description text NOT NULL,
    category varchar(50) NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.images (
    id serial PRIMARY KEY,
    post_id int NULL,
    url text NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    category varchar(50) NOT NULL,
    CONSTRAINT images_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON DELETE CASCADE
);

CREATE TABLE public.messages (
    id serial PRIMARY KEY,
    "name" varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    message text NOT NULL,
    status varchar(50) DEFAULT 'new',
    sended_at timestamp DEFAULT CURRENT_TIMESTAMP
);

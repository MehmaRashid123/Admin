import { createClient } from 'next-sanity'


export const client = createClient({
  projectId: "9hqjr7jw",
  dataset: "production",
  token: "skZkZXhqhw4bdEM7k0JrlriIMG8TEiNOSe3krp3IKQMssUUNbYsF9PoL38shv42W4MZVEGixzDMkuuYtGxOHWkwP4S4siJZVLko6mP3oZpvdnK3xwyPGWrSSba8ReawEjkyxkWlZvXbO0YYPL1FaNsh4raVOwAsnwG4VGbm24jlhlzr0Bnkt",
  apiVersion: "2025-02-05",
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
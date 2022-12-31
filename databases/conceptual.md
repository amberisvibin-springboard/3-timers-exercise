### Conceptual Exercise

Answer the following questions below:

- What is PostgreSQL?
  - An implementation of SQL

- What is the difference between SQL and PostgreSQL?
  - PostgreSQL implements SQL databases

- In `psql`, how do you connect to a database?
  - `\c name`

- What is the difference between `HAVING` and `WHERE`?
  - `WHERE` can't work with aggregates, while `HAVING` can

- What is the difference between an `INNER` and `OUTER` join?
  - `INNER` returns records that match in both tables, while `OUTER` returns all records in one table and matching records in the other

- What is the difference between a `LEFT OUTER` and `RIGHT OUTER` join?
  - `LEFT` and `RIGHT` signify which table returns all records

- What is an ORM? What do they do?
  - An Object-Relational-Mapper; translates object-oriented calls from a programming language to SQL to talk to the database

- What are some differences between making HTTP requests using AJAX 
  and from the server side using a library like `requests`?
  - AJAX is client side where `requests` is server side. 

- What is CSRF? What is the purpose of the CSRF token?
  - Cross-Site Request Forgery is when another site tries to submit data to a site. The CSRF token prevents this by ensuring only the same site can send data to the backend.

- What is the purpose of `form.hidden_tag()`?
  - It stores hidden components like the CSRF token.

SELECT name, price, is_active 
FROM products 
LIMIT 5;

SELECT name, price
FROM products
WHERE price > 200;

SELECT name, is_active
FROM products
WHERE is_active = true;

SELECT name, price
FROM products
WHERE is_active = false;

SELECT name, price
FROM products
WHERE price < 150 OR price > 250;

SELECT name, price, is_active
FROM products
WHERE is_active = true
  AND (price < 150 OR price > 250);

SELECT name, price
FROM products
ORDER BY price ASC;

SELECT name, price
FROM products
WHERE is_active = true AND price < 250
ORDER BY price ASC;

SELECT name, price
FROM products
WHERE price BETWEEN 150 AND 300;
ORDER BY price ASC;

SELECT name, category_id
FROM products
WHERE category_id in (5, 7, 9)
WHERE price IN price;

SELECT name, brand_id
FROM products
WHERE brand_id is NULL;

SELECT COUNT(*)
FROM products;

SELECT COUNT(*)
FROM products
WHERE is_active = true;

SELECT category_id, COUNT(*)
FROM products
GROUP BY category_id
HAVING is_active = true;

SELECT products.name, categories.name
FROM products
INNER JOIN categories
WHERE price
ON products.category_id = categories.id;
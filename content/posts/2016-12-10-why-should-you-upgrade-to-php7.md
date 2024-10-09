---
title: Why should you upgrade to PHP7?
author: Melroy van den Berg
type: post
date: 2016-12-10T13:49:41+01:00
url: /2016/why-should-you-upgrade-to-php7/
featured_image: /images/2016/06/php7_logo.png
images:
  - /images/2016/06/php7_logo.png
categories:
  - GNU/Linux OS
  - Intermediate
  - Networking
  - Programming
  - Security
  - Server
  - Software
tags:
  - PHP
  - CMS
  - declarations
  - Dotdeb
  - fast
  - memory usage
  - null coalescing
  - operator
  - performance
  - reduced memory
  - spaceship
  - speed
---

![PHP code](/images/2016/06/php_code.jpg)

Developers who running PHP-enabled websites such as WordPress, Drupal, Joomla, Magento or even PHP frameworks like Laravel and Symfony should know about the new major PHP version. As a developer you should think about switching to **PHP7**. I will talk about the how-to use it, some history, the benefits of PHP7 and finally how to get PHP7 on your system.  
And uhm... what about PHP version 6?

## Usage

About about 98% of the websites are still using PHP version 5.\*.  PHP 5 is now more than 11 years old, so it's time to move to PHP 7 and clean up obsolete functions. The PHP project has a list of [deleted functions](http://php.net/manual/en/migration70.incompatible.php#migration70.incompatible.removed-functions), which helps you porting PHP 5 to PHP 7 code. And list of [removed APIs & extensions](https://wiki.php.net/rfc/removal_of_dead_sapis_and_exts).

Together with other tips & tricks how to migrate your code to PHP 7. Most big blog systems (WordPress), **c**ontent **m**anagement **s**ystem (CMS like Joomla), e-commerce (Opencart) and other web-applications already support PHP 7 out-of-the-box! So just switch your webserver to PHP 7.

## History

In the beginning of 2015 the first _alpha_ of PHP 7 has been released. The first stable (v7.0.0) PHP is released at 1 December 2015. Currently, it's 2016 already and the PHP community is busy with version 7.0.8 (release candidate) and 7.1.0 alpha. PHP version 7.0.7 is released as stable. Most important issues are solved by now. PHP 7 is mature enough to use in production.

What about version 6? PHP 6 is never released, although it was in development but failed in some way. The idea was to introduce Unicode in PHP 5 calling it PHP 6. Unicode is a computing standard for the encoding and representation of text. Due to the complexity of introducing Unicode, and some bad decisions PHP 6 was never released. A lot of code needed to be reworked and changed in order to support Unicode. It is difficult to encourage people to do tedious work. Moreover they tried to do it as one big junk of work instead of working more iterative. Unicode doubled the memory consumption and impacted the performance due to conversions. So PHP 6 is abandoned. After a poll they decided to name the new PHP version not PHP 6 but PHP 7 instead.

## Performance

One of the biggest reasons to switch from PHP 5 to PHP 7 are the speed improvements. Overall conclusion: PHP 7 outperform the rest. See below some benchmarks. Drupal & WordPress measurements (higher is better):

![PHP 5 vs PHP 7 ](/images/2016/05/speed_benchmark.png "PHP 5 vs PHP 7 website (**2x faster**!)")

Another comparison of PHP versions as well as HHVM (is a virtual machine for PHP) in req/sec (again higher is better).

![PHP 5.6 vs HHVM 3.11 vs PHP 7.0](/images/2016/05/requests_per_seconds.png "PHP 5.6 vs HHVM 3.11 vs PHP 7.0")

Response time between PHP 5, HHVM and PHP 7 (less is better).

![Response time between PHP 5, HHVM and PHP 7](/images/2016/05/respond_time.png "Response time between PHP 5, HHVM and PHP 7")

Last but not least, a comparison between PHP 5, HHVM and PHP 7 memory usage, RAM in megabytes (less is better).

![Memory usage PHP 5, HHVM and PHP 7](/images/2016/05/memory_useage.png "Memory usage PHP 5, HHVM and PHP 7")

## What is new?

- Improvement in **performance**! PHP 7 is twice as fast as PHP 5.6.
- Significantly **reduced memory usage**, as we have seen above.
- Abstract Syntax Tree (AST) = data structure used for the PHP 7 compiler.
- Consistent 64-bit support
- Improved Exception hierarchy
- Many fatal errors are now converted to Exceptions
- Secure random number generator
- New operator: **null coalescing** (??) = returning the result of the first operand if it exists & not NULL, or else its second operand.
- New operator: **spaceship** (<=>) = returning -1, 0 or 1 when the first operand respectively is less than, equal to, or greater than the second operand.
- **Anonymous Classes**  = a class doesn't contain a name, can be used when the class does not need to be documented or is used only once.
- Use **define**() function for defining array constants (before only _const_ could be used).
- **Scalar Type declarations**  = allow functions to require parameters of a certain **type** at run-time.
- **Return Type declarations** = allow functions to return a specified type.
- And much more ...

## Download

You can download the [latest PHP 7 version from there site](http://www.php.net/downloads.php).

If you got a Debian server running with PHP, try-out [Dotdeb.org](https://www.dotdeb.org/instructions/), which provides up-to-date packages (32bit & 64 bit) for Debian servers. Including Nginx, MySQL as well as **PHP 7**!

Depending on your GNU/Linux distribution, PHP 7 could already be available in your package manager.

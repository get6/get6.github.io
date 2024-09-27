---
title: <% tp.file.cursor(1) %>
date: <% tp.file.creation_date() %>
tags:
  - 
---

<% tp.web.random_picture("768x432") %>



---

<%*
const jsonUrl = "https://api.allorigins.win/get?url=https://zenquotes.io/api/random";

let response = await fetch(jsonUrl);
let json = await response.json(); // Parsing the outer JSON object
let obj = JSON.parse(json.contents); // Parsing the inner JSON contents

let quote = obj[0].q;
let author = obj[0].a;

// Format the output according to your requirements
tR += `> [!quote] ${quote}\n> — ${author}`;
%>
import $ from 'jquery';

const subtitle = $('#subtitle');
const content = $('#content');

export default function setPage(page) {
  subtitle.html(page.title);
  content.html(page.content);
}
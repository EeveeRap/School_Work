import './css/style.css'; 
import $ from 'jquery';
import loadBlogList from './blogList';

loadBlogList();

$('#homeLink').on('click', loadBlogList);
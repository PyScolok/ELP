from django.urls import path

from .views import *

urlpatterns = [
    path('main/', ManageCourseListView.as_view(), name='main'),
    path('create/', CourseUpdateView.as_view(), name='create'),
    path('<pk>/update/', CourseUpdateView.as_view(), name='edit'),
    path('<pk>/delete/', CourseDeleteView.as_view(), name='delete'),
]
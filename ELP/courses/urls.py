from django.urls import path

from .views import *

urlpatterns = [
    path('mine/', ManageCourseListView.as_view(), name='mine'),
    path('create/', CourseCreateView.as_view(), name='course_create'),
    path('<pk>/update/', CourseUpdateView.as_view(), name='course_edit'),
    path('<pk>/delete/', CourseDeleteView.as_view(), name='course_delete'),
    path('<pk>/module/', CourseModuleUpdateView.as_view(), name='course_module_update'),
]
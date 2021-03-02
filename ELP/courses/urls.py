from django.urls import path

from .views import *

urlpatterns = [
    path('mine/', ManageCourseListView.as_view(), name='mine'),
    path('create/', CourseCreateView.as_view(), name='course_create'),
    path('<pk>/update/', CourseUpdateView.as_view(), name='course_edit'),
    path('<pk>/delete/', CourseDeleteView.as_view(), name='course_delete'),
    path('<pk>/module/', CourseModuleUpdateView.as_view(), name='course_module_update'),
    path('module/order/', ModuleOrderView.as_view(), name='module_order'),
    path('module/<int:module_id>/', ModuleContentListView.as_view(), name='module_content_list'),
    path('module/<int:module_id>/content/<model_name>/create/', ContentCreateUpdateView.as_view(), name='module_content_create'),
    path('module/<int:module_id>/content/<model_name>/<id>/', ContentCreateUpdateView.as_view(), name='module_content_update'),
    path('content/<int:id>/delete/', ContentDeleteView.as_view(), name='module_content_delete'),
    path('content/order/', ContentOrderView.as_view(), name='content_order'),
]
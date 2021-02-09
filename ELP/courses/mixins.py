from django.urls import reverse_lazy
from django.contrib.auth.mixins import LoginRequiredMixin, PermissionRequiredMixin

from .models import Course


class OwnerMixin(object):
    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset.filter(owner=self.request.user)


class OwnerEditMixin(object):
    def form_valid(self, form):
        form.instance.owner = self.request.user
        return super().form_valid(form)


class OwnerCourseMixin(OwnerMixin, LoginRequiredMixin, PermissionRequiredMixin):
    model = Course
    fields = ['subject', 'title', 'slug', 'overview']
    success_url = reverse_lazy('mine')


class OwnerCourseEditMixin(OwnerCourseMixin, OwnerEditMixin):
    template_name = 'courses/manage/course/form.html'

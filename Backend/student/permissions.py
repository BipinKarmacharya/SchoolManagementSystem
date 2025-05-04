from rest_framework.permissions import BasePermission

class IsAdminUser(BasePermission):
    """
    Custom permission to allow only admins to update student records.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.user_type == "admin"

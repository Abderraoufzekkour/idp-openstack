# Architecture

## High-Level Design
PlatformOne follows a platform engineering approach where infrastructure is abstracted behind self-service templates.

## Components
### Backstage
The developer portal providing:
- Software catalog
- Self-service templates (Scaffolder)
- TechDocs
- Kubernetes visibility

### Crossplane
Manages infrastructure resources as Kubernetes CRDs:
- OpenStack VMs
- Kubernetes Namespaces
- PostgreSQL databases

### ArgoCD
GitOps engine that syncs Kubernetes manifests from GitHub to the cluster.

### Keycloak
OIDC provider for SSO across the platform.

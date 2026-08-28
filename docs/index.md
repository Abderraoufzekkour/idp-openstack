# PlatformOne - Internal Developer Platform

## Overview
PlatformOne is an enterprise Internal Developer Platform (IDP) built on Backstage, designed to accelerate service delivery for development teams.

## Platform Stack
| Layer | Technology |
|-------|-----------|
| Developer Portal | Backstage |
| Infrastructure | OpenStack (ICOSNET) |
| Container Orchestration | Kubernetes (RKE2) |
| GitOps | ArgoCD + FluxCD |
| Infrastructure as Code | Crossplane + OpenTofu |
| Secret Management | Vault |
| Identity | Keycloak (OIDC) |
| Storage | Rook-Ceph |

## Golden Paths
- **OpenStack VM** - Provision Ubuntu VMs via Crossplane
- **Enterprise FastAPI** - Full-stack Python service with Postgres
- **God-Tier FastAPI** - Fully automated service with GitOps
- **FastAPI Microservice** - Lightweight Kyverno-compliant service

# Deployment Guide

## Prerequisites
- Kubernetes cluster (RKE2)
- OpenStack access
- GitHub organization

## Backstage Deployment
Backstage is deployed via Helm on Kubernetes:
```bash
helm install devportal backstage/backstage -f values.yaml -n backstage
```

## Crossplane Setup
Crossplane providers required:
- provider-openstack
- provider-kubernetes
- provider-helm

## ArgoCD
All platform components are managed via ArgoCD applications in the `argocd` namespace.

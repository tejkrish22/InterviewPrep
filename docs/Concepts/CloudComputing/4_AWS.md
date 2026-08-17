# AWS

`Amazon Web Services` is one such cloud computing serivce provider who owns and maintains the `network-connected hardware` required for these application services, while you provision and use what you need via `web application`.

## Pricing of the Cloud

AWS has 3 pricing fundamentals, following the pay-as-you-go pricing model

- Compute: Pay for compute time.
- Storage: Pay for the data stored in the cloud
- Network: Data transfer out of the cloud is charged and in is not charged.

## AWS Global Infra

1. AWS Regions
2. AWS Availability zones
3. AWS Data Centers
4. AWS Edge Locations/ Points of Presence

### AWS Regions

- AWS has regions all around the world.
- A region is a cluster of data centers.
- Most AWS servies are region-scoped.
- Ex: us-east-1, eu-west-3, etc

> How to choose an AWS region?
> - Compliance with data governance and legal requirements.
> - Proximity to customers
> - Available services in that region
> - Pricing varies region to region

### AWS Availability Zones

- Each AZ is one or more discrete data centers with redundant power, networking and connectivity.
- They are separate form each other , so that they are isolated from disasters.
- They are connected with high bandwidth ultra-low latency networking.

### AWS Points of Presence

- Amazon has 400+ points of presence in 90+ cities across 40+ countries.
- Content is delivered to end users with lower latency.

## Shared Responsibility Model

![Shared responsibility Model](4_shared_responsibility.png)

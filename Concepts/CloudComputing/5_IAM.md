# Identity and Access Management

## Summary

* **Users**: mapped to a physical user, has a password for AWS Console
* **Groups**: contains users only
* **Policies**: JSON document that outlines permissions for users or groups * Roles: for EC2 instances or AWS services
* **Security**: MFA + Password Policy
* **AWS CLI**: manage your AWS services using the command-line
* **AWS SDK**: manage your AWS services using a programming language * Access Keys: access AWS using the CLI or SDK
* **Audit**: IAM Credential Reports & IAM Access Advisor

## Users and Groups

- IAM is a global service.
- `Root` account created by default and should not be used or shared.
- `Users` are people within your organisation, can be grouped.
- `Groups` only contain users, not other groups.
- Users don't have to belong to a group, and user can belong to multiple groups.

![[5_IAM.png]]

## IAM Permissions

- Users or Groups can be assigned JSON Documents called `Policies`
- IAM Policy consists of
	- Version: policy language version
	- ID: an identity for the policy (optional)
	- Statement: one or more individual statements
- Statements consists of
	- Sid: an identifier for the statement (optional)
	- Effect: whether the statement allows ot denies access (Allow, Deny)
	- Principal: account/user/role to which this policy applied to
	- Actions: list of actions this policy allows or denies
	- Resources: list of resources to which the actions applied to
	- Condition: conditions for when this policy is in effect (optional)
	
```
{
  "Version": "2012-10-17",
  "Id": "S3-Account-Permissions",
  "Statement": [
    {
      "Sid": "1",
      "Effect": "Allow",
      "Principal": {
        "AWS": ["arn:aws:iam::123456789012:root"]
      },
      "Action": [
        "s3:GetObject",
        "s3:PutObject"
      ],
      "Resource": ["arn:aws:s3:::mybucket/*"]
    }
  ]
}
```

- These policies define the `permissions`of the users
- In AWS you apply the `least privilege principle`; that is don't give more permissions than a user needs.

## IAM Roles for Services

- Some AWS service will need to perform actions on your behalf.
- To do so, we will assign permissions to AWS services with IAM roles.
- Common Roles:
	- EC2 Instance Roles
	- Lambda Function Roles
	- Roles for CloudFormation

## IAM Security Tool

- IAM Credentials Report (account-level)
	- A report that lists all your account's users and the status of their various credentials
- IAM Access Advisor (user-level)
	- Access advisor shows the service permission granted to a user and when those services were last accessed.
	- You can use this information to review your policies

## IAM Guidelines & Best Practices

- Do not use the root account except for AWS account setup.
- One physical user = One AWS user
- Assign users to groups and assign permissions to groups.
- Create a strong password policy
- Use and enforce the use of MFA
- Create and use Roles for giving permissions to AWS services.
- Use Access keys for CLI / Programmatic Access.
- Audit permissions of your account using IAM Credentials Report and IAM access advisor.

## Shared Responsibility Model for IAM

| AWS                                         | You                                                         |
| ------------------------------------------- | ----------------------------------------------------------- |
| Infrastructure                              | Users, groups, roles, policies management<br>and monitoring |
| Configuration and Vulnerability<br>Analysis | Enable MFA on all accounts                                  |
| Compliance Validation                       | Rotate all your keys often                                  |
|                                             | Use IAM tools to apply permissions                          |
|                                             | Analyse access patterns and review permissions              |
|                                             |                                                             |

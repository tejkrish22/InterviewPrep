# Identity and Access Management

## Users and Groups

- IAM is a global service.
- `Root` account created by default and should not be used or shared.
- `Users` are people within your organisation, can be grouped.
- `Groups` only contain users, not other groups.
- Users don't have to belong to a group, and user can belong to multiple groups.

![[Pasted image 20260513222246.png]]

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